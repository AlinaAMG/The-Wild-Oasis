import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const isDemoUser = email === "maria@yahoo.com";
 

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName || isDemoUser) return;
    updateUser({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null);
        e.target.reset();
        },
    }
  );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled={isUpdating || isDemoUser} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating || isDemoUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating || isDemoUser}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdating || isDemoUser} onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating || isDemoUser}>Update account</Button>

         {isDemoUser && (
         <p style={{ color: "red", fontSize: "0.9rem" }}>
         Demo users cannot update their profile information.
  </p>
)}
      </FormRow>
      
    </Form>
  );
}

export default UpdateUserDataForm;
