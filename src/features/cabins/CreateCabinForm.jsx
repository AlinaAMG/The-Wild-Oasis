import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({ cabinToEdit = {} ,onCloseModal}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
     defaultValues: isEditSession ? editValues : {},
   
  });
  
  const { errors } = formState;


  function onSubmit(data) {
    const image = typeof data.image === "string" ?data.image: data.image[0]

    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: () => {
        console.log(data)
        reset();
        onCloseModal?.()
      },
    });
    else createCabin({ ...data, image: image }, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
      }
    });
  }

  function onError(errors) {
    // console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? "modal":"regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled = {isEditing}
          {...register("name", {
          required:"This field is required",
        })} />
      </FormRow>
     
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number"
          id="maxCapacity"
         disabled={isEditing}
          {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message:"Capacity should be at least 1",
          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number"
          id="regularPrice"
        disabled={isEditing}
          {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message:"Capacity should be at least 1",
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isEditing}
          {...register("discount", {
          required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price",
        })} />
      </FormRow>

      <FormRow label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
          required:"This field is required",
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
        {...register("image", {
          required:isEditSession ? false :"This field is required",
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isEditing}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;


