import { Link, useForm } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/departments');
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Add Department
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Create a new department for the organization.
                        </p>
                    </div>

                    <Link href="/departments">
                        <Button variant="secondary">
                            Back
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <form onSubmit={submit} className="space-y-6">

                        <Input
                            label="Department Name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="Enter department name"
                            error={errors.name}
                        />

                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Enter department description"
                                rows="5"
                                className={`w-full rounded-lg border px-4 py-2.5 text-gray-800 outline-none transition focus:ring-2 ${
                                    errors.description
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                }`}
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
                            <Link href="/departments">
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button type="submit" variant="primary" disabled={processing} className="!w-auto px-3 py-1.5 text-sm">
                                    {processing ? 'Creating...' : 'Create Department'}
                            </Button>
                        </div>

                    </form>

                </div>
            </div>
        </DashboardLayout>
    );
}
