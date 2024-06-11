import { Form } from '@/components/ui/form';
import { createAssetSchema } from '@/lib/schemas';
import { TCreateAssetForm } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
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
            <form onSubmit={() => createAssetForm.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-1/2 mx-auto bg-background p-10 shadow-md rounded-lg">

            </form>
        </Form>

    )
}

export default CreateAssetForm;