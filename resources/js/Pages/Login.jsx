import { Link, useForm } from '@inertiajs/react';
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
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_32%),linear-gradient(135deg,#f8fbff_0%,#eff6ff_38%,#f8fafc_100%)] px-4 py-12">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/60 bg-white/75 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
                <div className="hidden flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-10 text-white lg:flex">
                    <div>
                        <div className="mb-8 inline-flex rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                            EMS Portal
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
                        <p className="mt-4 max-w-md text-base text-slate-200">
                            Simplify attendance, leave approvals, and employee management from one streamlined dashboard.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            'Track attendance in real time',
                            'Handle leave requests efficiently',
                            'Keep employee records centralized',
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
                        <h2 className="text-3xl font-bold text-slate-900">Sign in</h2>
                        <p className="mt-2 text-sm text-slate-500">Employee Management System</p>
                    </div>

                    <form onSubmit={submit}>
                        <Input
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            error={errors.email}
                            name="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                            error={errors.password}
                            name="password"
                        />

                        <div className="mb-6 flex items-center justify-between gap-2">
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                Remember me
                            </label>

                            <span className="text-sm text-slate-400">Secure access</span>
                        </div>

                        <Button type="submit" variant="primary" disabled={processing}>
                            {processing ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-7 text-center text-sm text-slate-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-semibold text-blue-600 transition hover:text-blue-700">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
