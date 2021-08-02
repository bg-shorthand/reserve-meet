import { DefaultProps } from 'const/type';
import AdminList from 'Components/AdminList/AdminList';
import RoomsTable from 'Components/RoomsTable/RoomsTable';

const Admin = ({ className }: DefaultProps) => {
  return (
    <section className={className}>
      <h1>Admin</h1>
      <h2>관리자</h2>
      <AdminList />
      <h2>회의실</h2>
      <RoomsTable />
    </section>
  );
};

export default Admin;
