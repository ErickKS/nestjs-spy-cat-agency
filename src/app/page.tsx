import SpyCatTable from "@/components/cats-table";
import SpyCatForm from "@/components/form";

export default function Home() {
  return (
    <main className='max-w-4xl mx-auto py-10 space-y-10'>
      <h1 className='text-3xl font-bold'>Spy Cats Management</h1>
      <SpyCatForm />
      <SpyCatTable />
    </main>
  );
}
