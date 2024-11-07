import React from 'react';
import PdfFile from '../PdfFile';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const AssetDetails = () => {
    return (
        <div>
            <PDFDownloadLink document={<PdfFile/>} fileName='Pdffile.pdf'>
            {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
            </PDFDownloadLink>
            <PDFViewer style={{width: '100%', height: '100vh'}}>
                
            <PdfFile/>
            </PDFViewer>
        </div>
    );
};

export default AssetDetails;