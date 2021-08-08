import { useState } from 'react';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import peopleApi from 'api/googleLib/peopleApi';
import debounce from 'lodash/debounce';
import { DefaultProps } from 'const/type';

interface Props extends DefaultProps {
  setList: MouseEventHandler;
}

const SearchUser = ({ className, setList }: Props) => {
  const [searchResert, setSearchResert] = useState<{ email: string; photo: string }[]>([]);

  const searchUserHandler: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.value) {
      setSearchResert([]);
      return;
    }
    const res = await peopleApi.searchUser(e.target.value);
    if (res?.result.people) {
      const people = res.result.people;
      const newSearchResert = people.map(({ emailAddresses, photos }) => ({
        email: emailAddresses?.find(email => /@rsupport.com$/.test(email.value!))?.value || '',
        photo: photos?.find(img => img.metadata?.source?.type === 'PROFILE')?.url || '',
      }));
      setSearchResert(newSearchResert);
    }
  };
  const init = () => {
    const $input = document.getElementById('searchUserInput') as HTMLInputElement;
    $input.value = '';
    setSearchResert([]);
    $input.focus();
  };

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
        autoComplete="off"
      />
      {searchResert.length ? (
        <ul>
          {searchResert.map(person => (
            <li
              key={person.email}
              id={person.email}
              onClick={async e => {
                await setList(e);
                init();
              }}
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
