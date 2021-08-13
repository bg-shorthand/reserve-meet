import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adminsState, alertContentState, isOpenState } from 'state/state';
import StyledCloseButton from 'Components/CloseButton/CloseButton.style';
import StyledSearchUser from 'Components/SearchUser/SearchUser.style';
import { MouseEventHandler } from 'react';
import adminApi from 'api/db/adminApi';
import { DefaultProps } from 'const/type';
import StyledButton from 'Components/Button/Button.style';

const AdminList = ({ className }: DefaultProps) => {
  const [admins, setAdmins] = useRecoilState(adminsState);
  const setIsOpen = useSetRecoilState(isOpenState);
  const setAlertContent = useSetRecoilState(alertContentState);

  const [newAdmins, setNewAdmins] = useState<{ email: string }[]>([]);

  const setNewAdminsHandler = async (email: string) => {
    const id = email;

    if (id) {
      if (newAdmins.find(admin => admin.email === id) || admins.find(admin => admin.email === id))
        return;
      setNewAdmins(pre => [...pre, { email: id }]);
    }
  };
  const deleteNewAdminsHandler: MouseEventHandler<Element> = e => {
    const email = e.currentTarget.closest('li')?.textContent;
    setNewAdmins(pre => pre.filter(admin => admin.email !== email));
  };
  const deleteAdminHandler: MouseEventHandler<Element> = async e => {
    const target = e.target as Element;
    const email = target.closest('li')?.textContent;
    if (email) {
      setIsOpen(pre => ({ ...pre, alert: true }));
      setAlertContent({
        content: '삭제하시겠습니까?',
        yesEvent: async () => {
          setIsOpen(pre => ({ ...pre, spinner: true }));
          const res = await adminApi.delete(email);
          const newAdmins = await res.data;
          setAdmins([...newAdmins]);
          setIsOpen(pre => ({ ...pre, spinner: false }));
        },
      });
    }
  };
  const postAdminHandler: MouseEventHandler<Element> = async () => {
    if (!newAdmins.length) return;
    await adminApi.post(newAdmins);

    const getAdmins = async () => {
      const res = await adminApi.get();
      const data = res.data;
      if (data.length === admins.length) {
        setTimeout(getAdmins, 100);
      } else {
        setAdmins([...data]);
        setNewAdmins([]);
      }
    };

    getAdmins();
  };

  return (
    <section className={className}>
      <article>
        <h3>현재 관리자</h3>
        <ul>
          {admins.length
            ? admins.map(admin => (
                <li key={admin._id}>
                  {admin.email}
                  {admins.length > 1 ? <StyledCloseButton onClick={deleteAdminHandler} /> : null}
                </li>
              ))
            : null}
        </ul>
      </article>
      <article>
        <h3>추가할 관리자</h3>
        <StyledSearchUser setList={setNewAdminsHandler} />
        <ul>
          {newAdmins.length ? (
            newAdmins.map(user => (
              <li key={user.email}>
                {user.email}
                <StyledCloseButton onClick={deleteNewAdminsHandler} />
              </li>
            ))
          ) : (
            <li>관리자를 검색 후 아래 버튼을 눌러주세요</li>
          )}
        </ul>
        <StyledButton onClick={postAdminHandler}>관리자 추가</StyledButton>
      </article>
    </section>
  );
};

export default AdminList;
