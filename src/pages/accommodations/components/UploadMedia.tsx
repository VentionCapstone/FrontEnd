import { Box } from '@mui/material';
import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const maxNumber: number = 10;

function UploadMedia() {
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  // const { mutate } = useMutation({
  //   mutationFn: async () => {
  //     const formData = new FormData();

  //     for (let index = 0; index < images.length; index++) {
  //       const image = images[index];
  //       formData.append('filename', image.file.name);
  //       formData.append('base64Image', await convertImageToBase64(image.file as File));
  //     }

  //     const { data } = await httpClient.post(
  //       'accommodations/3dff3aa-bdc2-40f3-95d0-4396cd72982c/file',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //   },
  // });

  return (
    <Box>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg', 'gif', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          // isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              // style={isDragging ? { color: 'red' } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img src={image.data_url} alt="" width="100" height={100} /> */}
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </Box>
  );
}

export default UploadMedia;
