import { Form } from '@/components/ui/form';
import { createAssetSchema } from '@/lib/schemas';
import { TCreateAssetForm } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateAssetForm = () => {

    const createAssetForm = useForm<TCreateAssetForm>({
        resolver: zodResolver(createAssetSchema),
        defaultValues: {
            assetName: "",
            assetDescription: "",
            assetType: undefined
        }
    })

    async function onSubmit(values: TCreateAssetForm) {

    }

    return (
        <Form {...createAssetForm}>
            <form onSubmit={() => createAssetForm.handleSubmit(onSubmit)} className='container grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className="space-y-2">
                </div>
                <div className="space-y-2">
                </div>
            </form>
        </Form>

    )
}

export default CreateAssetForm;