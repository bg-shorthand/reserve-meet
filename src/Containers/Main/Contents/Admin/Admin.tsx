import { DefaultProps } from 'const/type';
import StyledAdminList from 'Components/AdminList/AdminList.style';
import RoomsTable from 'Components/RoomsTable/RoomsTable';

const Admin = ({ className }: DefaultProps) => {
  return (
    <section className={className}>
      <h1 className="a11y-hidden">Admin</h1>
      <h2>관리자</h2>
      <StyledAdminList />
      <h2>회의실</h2>
      <RoomsTable />
    </section>
  );
};

export default Admin;
