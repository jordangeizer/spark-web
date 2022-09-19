---
title: Drop Zone
isExperimentalPackage: true
---

The `Dropzone` component lets users upload files by clicking on, or dragging and
dropping onto the "drop zone". It can also be be triggered by clicking on the
label.

## Usage

### Field

Each `Dropzone` must be accompanied by a [`Field`](/package/field) with a label.
Effective form labeling helps inform users which selection to make.

## Examples

### Accept

By providing an `accept` prop, we can make the `Dropzone` only accept certain
file types.

<details>
<summary><Text inline weight="semibold">Accepted MIME types:</Text></summary>
<br />

- `audio/*`
- `audio/mpeg`
- `audio/wav`
- `image/*`
- `image/gif`
- `image/heic`
- `image/jpeg`
- `image/png`
- `image/svg+xml`
- `image/tiff`
- `image/webp`
- `text/*`
- `text/csv`
- `text/plain`
- `text/rtf`
- `video/*`
- `video/mp4`
- `video/mpeg`
- `application/msword`
- `application/pdf`
- `application/rtf`
- `application/vnd.ms-excel`
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (.xlsx)
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  (.docx)
- `application/zip`

</details>

```jsx live
<Stack gap="large">
  <Field label="Upload image" description="Accepts common image file formats">
    <Dropzone accept={['image/jpeg', 'image/png']} />
  </Field>
  <Field label="Upload PDF" description="Only accepts PDF files">
    <Dropzone accept="application/pdf" />
  </Field>
</Stack>
```

### Show Image Thumbnails

By default, once a file as been added to the Dropzone, a document icon will
displayed next to the file name in the list below. If you have uploaded an
image, you can use the `showImageThumbnails` to show an image preview instead.

```jsx live
<Field label="Upload image" description="Drop an image here to see a preview">
  <Dropzone accept="image/jpeg" showImageThumbnails />
</Field>
```

## Props

<PropsTable displayName="Dropzone" />
