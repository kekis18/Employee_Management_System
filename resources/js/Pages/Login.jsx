import { useForm } from '@inertiajs/react';
import Button from '../Components/Button';
import Input from '../Components/Input';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        EMS
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Employee Management System
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={submit}>

                    <Input
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        placeholder="Enter your email"
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        placeholder="Enter your password"
                        error={errors.password}
                    />

                    <div className="mb-5 flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />

                        <label className="text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </Button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="font-medium text-blue-600 hover:text-blue-700"
                    >
                        Register
                    </a>
                </div>

            </div>
        </div>
    );
}
