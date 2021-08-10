import { useState, ChangeEventHandler, KeyboardEventHandler, useEffect } from 'react';
import peopleApi from 'api/googleLib/peopleApi';
import debounce from 'lodash/debounce';
import { DefaultProps } from 'const/type';

interface Props extends DefaultProps {
  setList: (email: string) => {};
}

const SearchUser = ({ className, setList }: Props) => {
  const [searchResert, setSearchResert] = useState<
    { email: string; photo: string; selected: boolean }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchUserHandler: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.value) {
      setSearchResert([]);
      setSelectedIndex(-1);
      return;
    }
    const res = await peopleApi.searchUser(e.target.value);
    if (res?.result.people) {
      const people = res.result.people;
      const newSearchResert = people.map(({ emailAddresses, photos }, index) => ({
        email: emailAddresses?.find(email => /@rsupport.com$/.test(email.value!))?.value || '',
        photo: photos?.find(img => img.metadata?.source?.type === 'PROFILE')?.url || '',
        selected: index === 0,
      }));
      setSearchResert(newSearchResert);
    }
  };
  const keyboardHandler: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(pre => {
        return pre === -1 ? 0 : pre === searchResert.length - 1 ? 0 : pre + 1;
      });
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(pre => {
        return pre === -1 ? 0 : pre === 0 ? searchResert.length - 1 : pre - 1;
      });
    } else if (e.key === 'Enter') {
      if (!document.querySelector('.selected')) return;
      const id = document.querySelector('.selected')?.id || '';
      await setList(id);
      init();
    } else if (e.key === 'Escape') {
      init();
    }
  };
  const init = () => {
    const $input = document.getElementById('searchUserInput') as HTMLInputElement;
    $input.value = '';
    setSearchResert([]);
    $input.focus();
  };

  useEffect(() => {
    setSearchResert(pre =>
      pre.map((person, index) => ({ ...person, selected: index === selectedIndex })),
    );
  }, [selectedIndex]);

  return (
    <article className={className}>
      <label className="a11y-hidden" htmlFor="searchUserInput">
        사용자 이름
      </label>
      <input
        type="text"
        id="searchUserInput"
        placeholder="이름을 입력하세요"
        onChange={debounce(searchUserHandler, 200)}
        onKeyUp={keyboardHandler}
        autoComplete="off"
      />
      {searchResert.length ? (
        <ul>
          {searchResert.map(person => (
            <li
              key={person.email}
              id={person.email}
              onClick={async e => {
                await setList(e.currentTarget.closest('li')?.id || '');
                init();
              }}
              className={person.selected ? 'selected' : ''}
            >
              {person.photo && <img src={person.photo} alt={person.email + '의 프로필'} />}
              <p>{person.email}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};

export default SearchUser;
