import { DefaultProps } from 'const/type';
import StyledAdminList from 'Components/AdminList/AdminList.style';
import StyledRoomsTable from 'Components/RoomsTable/RoomsTable.style';

const Admin = ({ className }: DefaultProps) => {
  return (
    <section className={className}>
      <div>
        <h1 className="a11y-hidden">Admin</h1>
        <h2>관리자</h2>
        <StyledAdminList />
        <h2>회의실</h2>
        <StyledRoomsTable />
      </div>
    </section>
  );
};

export default Admin;
