function AuthLayout({ children }) {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;