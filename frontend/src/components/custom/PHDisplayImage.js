import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { convertByteArrayToImage } from '../../utils/utils';
const PHDisplayImage = ({ ba }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const displayImage = async () => {
        try {
            const imageUrl = await convertByteArrayToImage(ba);
            setImageSrc(imageUrl);
        }
        catch (error) {
            console.error('Error creating image URL:', error);
        }
    };
    useEffect(() => {
        displayImage();
    }, []);
    // const createBlobUrl = (blob) => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       resolve(reader.result);
    //     };
    //     reader.onerror = (error) => reject(error);
    //     reader.readAsDataURL(blob);
    //   });
    // };
    return (_jsx("div", { children: imageSrc && (_jsx("div", { children: _jsx("img", { src: imageSrc, alt: "Preview", style: { height: "5rem", width: "7rem" } }) })) }));
};
export default PHDisplayImage;
