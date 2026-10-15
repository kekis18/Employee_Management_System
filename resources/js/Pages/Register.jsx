import { useForm } from '@inertiajs/react';
import Button from '../Components/Button';
import Input from '../Components/Input';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/register');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Employee Management System
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Create your account to get started
                    </p>
                </div>

                <form onSubmit={submit}>

                    <Input
                        label="First Name"
                        value={data.first_name}
                        onChange={(e) =>
                            setData('first_name', e.target.value)
                        }
                        placeholder="Enter first name"
                        error={errors.first_name}
                    />

                    <Input
                        label="Middle Name"
                        value={data.middle_name}
                        onChange={(e) =>
                            setData('middle_name', e.target.value)
                        }
                        placeholder="Enter middle name"
                        error={errors.middle_name}
                    />

                    <Input
                        label="Last Name"
                        value={data.last_name}
                        onChange={(e) =>
                            setData('last_name', e.target.value)
                        }
                        placeholder="Enter last name"
                        error={errors.last_name}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        placeholder="Enter email address"
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        placeholder="Enter password"
                        error={errors.password}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData(
                                'password_confirmation',
                                e.target.value
                            )
                        }
                        placeholder="Confirm password"
                        error={errors.password_confirmation}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing
                            ? 'Creating Account...'
                            : 'Register'}
                    </Button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-700"
                    >
                        Sign In
                    </a>
                </div>

            </div>
        </div>
    );
}
