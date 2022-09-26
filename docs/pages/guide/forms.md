---
order: 3
title: Working with forms
description:
  Web forms are one of the main points of interaction between a user and a web
  site or application. In this guide, we will be building a simple sign in form
  using two popular libraries react-hook-form and zod.
---

**Note:** The Spark Web component library does not have any opinions for how
form state should be handled. All of our form components have been designed to
work with any form library.

## 1. Set up a new Spark Web project

Follow the [getting started guide](/guide/getting-started) for steps on how to
get Spark Web set up using our starter project.

## 2. Install Spark Web packages

Install the Spark Web packages that we will be using for this example by running
the following command in your terminal:

```sh
yarn add @spark-web/container @spark-web/button @spark-web/field @spark-web/password-input @spark-web/stack @spark-web/text-input
```

## 3. Set up the base layout

We're building a login form, so lets create a new page for users to login with
when they navigate to `/login`.

Go into the `pages` directory and create a new file called `login.tsx`.

This might be tutorial on how to use Spark Web to build a form, but we still
want it to look pretty — lets get some basic layout set up.

```tsx
import { Container } from '@spark-web/container';
import { Stack } from '@spark-web/stack';
import NextHead from 'next/head';

export default function LoginPage() {
  return (
    <Stack padding="xxlarge">
      <NextHead>
        <title>Login – Brighte</title>
      </NextHead>
      <Container size="small">
        <Stack
          as="form"
          gap="large"
          border="standard"
          paddingX="large"
          paddingY="xlarge"
          borderRadius="medium"
        >
          {/* Our form content will go here */}
        </Stack>
      </Container>
    </Stack>
  );
}
```

## 4. Compose the user interface

Using the `Field`, `TextInput`, `PasswordInput` and `Button` components, we can
quickly compose the user interface for the form:

```tsx
import { Button } from '@spark-web/button';
import { Field } from '@spark-web/field';
import { PasswordInput } from '@spark-web/password-input';
import { TextInput } from '@spark-web/text-input';

// Email input
<Field label="Email">
  <TextInput placeholder="email@domain.com" type="email" />
</Field>

// Password input
<Field label="Password">
  <PasswordInput placeholder="Password" />
</Field>

// Submit button
<Button type="submit">Login</Button>
```

## 5. Define the form schema

Zod is a schema declaration and validation library that is powerful, yet easy to
use.

In this step, we will be creating a basic form schema for the `email` and
`password` form fields with some simple validation.

For more information about Zod, please refer to the
[official documentation](https://github.com/colinhacks/zod).

We need to install these new dependencies by running the following command in
your terminal:

```sh
yarn add @hookform/resolvers zod
```

Now lets define our schema. Our login form has just two fields — email and
password.

For our form to be valid, the email field is required, and it must be a valid
email address. The password field is also required, and it must be at least 8
characters.

```tsx
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email address')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type FormSchema = z.infer<typeof formSchema>;
```

You might have noticed that the password schema looks a little odd, we defined
the `min` length twice! This is so we can show a different error message for a
blank field compared to one with not enough characters.

## 6. Handling form state

In this step, we will be managing our form state with `react-hook-form`, a light
weight, easy-to-use library for handling form state. For more information about
`react-hook-form`, please refer to the
[official documentation](https://react-hook-form.com/).

We need to install this new dependency by running the following command in your
terminal:

```sh
yarn add react-hook-form
```

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@spark-web/button';
import { Container } from '@spark-web/container';
import { Field } from '@spark-web/field';
import { PasswordInput } from '@spark-web/password-input';
import { Stack } from '@spark-web/stack';
import { TextInput } from '@spark-web/text-input';
import NextHead from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email address')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(formValues => {
    /**
     * This is where you would send the form state to the backend,
     * but in this example we're just going to log the values to the console.
     */
    console.log(formValues);
  });

  return (
    <Stack padding="xxlarge">
      <NextHead>
        <title>Login – Brighte</title>
      </NextHead>
      <Container size="small">
        <Stack
          as="form"
          onSubmit={handleSubmit}
          gap="large"
          border="standard"
          paddingX="large"
          paddingY="xlarge"
          borderRadius="medium"
        >
          {/* Email input */}
          <Field label="Email">
            <TextInput
              placeholder="email@domain.com"
              type="email"
              {...form.register('email')}
            />
          </Field>

          {/* Password input */}
          <Field label="Password">
            <PasswordInput
              placeholder="Password"
              {...form.register('password')}
            />
          </Field>

          {/* Submit button */}
          <Button type="submit">Login</Button>
        </Stack>
      </Container>
    </Stack>
  );
}
```

## 7. Handling invalid states

By making use of the `tone` and `message` props available to the `Field`
component, we can let the user know they have an invalid form.

We can check if an input doesn't pass our validation by looking at the
`form.formState.errors` object that we get from `react-hook-form`.

We've written a little utility function that checks if there are any errors for
an input. If there are, we return an object with the error message and the
`critical` tone matching the props for the `Field` component.

```tsx
/**
 * Utility for providing error messages for the `Field` component.
 */
export function validateField<
  Obj extends Record<string, { message?: string }>,
  Key extends keyof Obj
>(errors: Obj, inputName: Key) {
  if (inputName in errors) {
    return {
      message: errors[inputName].message,
      tone: 'critical',
    } as const;
  }
}
```

To use it, we spread it onto our `Field` component, passing it the errors object
and the name of the input we're checking.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@spark-web/button';
import { Container } from '@spark-web/container';
import { Field } from '@spark-web/field';
import { PasswordInput } from '@spark-web/password-input';
import { Stack } from '@spark-web/stack';
import { TextInput } from '@spark-web/text-input';
import NextHead from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email address')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type FormSchema = z.infer<typeof formSchema>;

/**
 * Utility for providing error messages for the `Field` component.
 */
export function validateField<
  Obj extends Record<string, { message?: string }>,
  Key extends keyof Obj
>(errors: Obj, inputName: Key) {
  if (inputName in errors) {
    return {
      message: errors[inputName].message,
      tone: 'critical',
    } as const;
  }
}

export default function LoginPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(formValues => {
    console.log(formValues);
  });

  return (
    <Stack padding="xxlarge">
      <NextHead>
        <title>Login – Brighte</title>
      </NextHead>
      <Container size="small">
        <Stack
          as="form"
          onSubmit={handleSubmit}
          gap="large"
          border="standard"
          paddingX="large"
          paddingY="xlarge"
          borderRadius="medium"
        >
          {/* Email input */}
          <Field
            label="Email"
            {...validateField(form.formState.errors, 'email')}
          >
            <TextInput
              placeholder="email@domain.com"
              type="email"
              {...form.register('email')}
            />
          </Field>

          {/* Password input */}
          <Field
            label="Password"
            {...validateField(form.formState.errors, 'password')}
          >
            <PasswordInput
              placeholder="Password"
              {...form.register('password')}
            />
          </Field>

          {/* Submit button */}
          <Button type="submit">Login</Button>
        </Stack>
      </Container>
    </Stack>
  );
}
```

## 8. Wrapping up

Thats all you need to know to work with forms using Spark Web. If you run into
any issues or have further questions around using Spark Web, make sure you reach
out in the the
[#spark-web-support](https://brighte-au.slack.com/archives/C03C4J5AUHY) Slack
channel.

For general frontend questions that aren't related to Spark Web, it's bet to use
[#tech-frontend](https://brighte-au.slack.com/archives/C02QUH9KG3W).
