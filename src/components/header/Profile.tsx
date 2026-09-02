const Profile = () => {
  return (
    <div className="flex w-1/2 items-center gap-2 min-[1000px]:w-auto min-[1000px]:order-4">
      <div className="h-[60px] w-[60px] rounded-lg bg-brand-dark min-[1000px]:order-2"></div>
      <div className="text-start min-[1000px]:order-1 min-[1000px]:text-end">
        <p className="text-brand-dark">Olá,</p>
        <h3 className="font-semibold text-brand-dark text-[1.17rem]">Adelson</h3>
      </div>
    </div>
  )
}

export default Profile;