export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>

      <hr />

      <p className="text-4xl">
        Profile page{" "}
        <span className="rounded bg-orange-500 p-2 text-black">
          {id}
        </span>
      </p>
    </div>
  );
}