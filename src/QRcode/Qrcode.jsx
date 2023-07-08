import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ text, size }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, text, { width: size, height: size }, error => {
                if (error) console.error(error);
            });
        }
    }, [text], [size]);
    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvasRef.current.toDataURL('image/png');
        downloadLink.download = 'qrcode.png';
        downloadLink.click();
    };

    return <>
        <canvas ref={canvasRef} />
        <div className='qr-btn' onClick={handleDownload}>Download</div>
    </>
};

export default QRCodeGenerator;
