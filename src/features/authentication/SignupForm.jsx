import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { useState } from "react";


// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const [demoUserError, setDemoUserError] = useState("");
  const { register, formState, getValues, handleSubmit,reset } = useForm();
  const { signup, isLoading } = useSignup();
   const { errors } = formState;


 
  function onSubmit({ fullName, email, password }) {
    const isDemoUser = email === "maria@yahoo.com";
    if (!fullName || !email || !password) return;

    if (isDemoUser) {
         console.log("Demo user detected — registration blocked");
      setDemoUserError("Demo ussers cannot add new users");
      return;
    }
    
     setDemoUserError("");
    
 signup({ fullName, email, password}, {
      onSettled: () => reset,
    
    });
    
  }
  return (
    <Form onSubmit = {handleSubmit(onSubmit)} style={{ width: "70%",margin:"10px auto"}}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register("email", {
          required: "This field is required", pattern: {
            value: /\S+@\S+\.\S+/,
            message:"Please provide a valid email address"
          }
        })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register("password", {
          required: "This field is required", minLength: {
            value: 8,
            message:"Password needs a minimum of 8 characters",
          }
        })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register("passwordConfirm", {
          required: "This field is required",
          validate:(value) =>value === getValues().password || "Password need to match",
        })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick = {reset}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
      
      {demoUserError && (
        <p style={{ color: "red", fontSize: "0.9rem", marginTop: "1rem" }}>
          {demoUserError}
        </p>
      )}
    </Form>
  );
}

export default SignupForm;
