import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          You don't have permission to access this page.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
