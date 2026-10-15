import { Link, useForm } from '@inertiajs/react';
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
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#eff6ff_35%,#f8fafc_100%)] px-4 py-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/60 bg-white/75 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr] lg:grid">
                <div className="hidden flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-10 text-white lg:flex">
                    <div>
                        <div className="mb-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                            Join Us
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Create your account</h1>
                        <p className="mt-4 max-w-sm text-base text-slate-200">
                            Build a secure and organized employee management workspace from day one.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            'Personalized employee profiles',
                            'Improved attendance tracking',
                            'Streamlined approvals and reports',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-blue-100">
                                    ✓
                                </div>
                                <span className="text-sm text-slate-100">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-7 sm:p-9 lg:p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
                            EMS
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                        <p className="mt-2 text-sm text-slate-500">Employee Management System</p>
                    </div>

                    <form onSubmit={submit} className="space-y-2">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input
                                label="First Name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                placeholder="Enter first name"
                                error={errors.first_name}
                                name="first_name"
                            />

                            <Input
                                label="Middle Name"
                                value={data.middle_name}
                                onChange={(e) => setData('middle_name', e.target.value)}
                                placeholder="Enter middle name"
                                error={errors.middle_name}
                                name="middle_name"
                            />
                        </div>

                        <Input
                            label="Last Name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            placeholder="Enter last name"
                            error={errors.last_name}
                            name="last_name"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter email address"
                            error={errors.email}
                            name="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter password"
                            error={errors.password}
                            name="password"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                            error={errors.password_confirmation}
                            name="password_confirmation"
                        />

                        <div className="pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Creating Account...' : 'Register'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-7 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
