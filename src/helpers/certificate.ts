import { PDFDocument, StandardFonts, PDFFont } from 'pdf-lib';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import { isEmpty } from 'lodash';

import { FormState, Reason } from 'types';
import pdfBase from 'assets/certificate.pdf';

const generateQR = async (text: string): Promise<string | void> => {
  try {
    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      rendererOpts: {
        quality: 0.92,
      },
      margin: 1,
    };

    return QRCode.toDataURL(text, opts);
  } catch (err) {
    console.error(err);
  }
};

const pad = (str: any): string => {
  return String(str).padStart(2, '0');
};

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Les mois commencent à 0
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

const formatReasons = (reasons: Reason[]): string => {
  return reasons.join('-');
};

const formatProfile = (profile: FormState): FormState => {
  const date = profile?.date?.split('-').reverse().join('/');
  const birthday = profile?.birthday?.split('-').reverse().join('/');

  return { ...profile, birthday, date };
}

const idealFontSize = (font: PDFFont, text: string, maxWidth: number, minSize: number, defaultSize: number) => {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
};

const generatePdf = async (profile: FormState, reasons: Reason[]) => {
  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString('fr-FR');
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', 'h');

  const {
    lastname,
    firstname,
    birthday,
    birthplace,
    address,
    zipcode,
    town,
    date,
    time,
  } = profile;
  const releaseHours = String(time).substring(0, 2);
  const releaseMinutes = String(time).substring(3, 5);

  const data = [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${lastname}`,
    `Prenom: ${firstname}`,
    `Naissance: ${birthday} a ${birthplace}`,
    `Adresse: ${address} ${zipcode} ${town}`,
    `Sortie: ${date} a ${releaseHours}h${releaseMinutes}`,
    `Motifs: ${formatReasons(reasons)}`,
  ].join('; ');

  const existingPdfBytes = await fetch(pdfBase).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text: string, x: number, y: number, size = 11) => {
    page1.drawText(text, { x, y, size, font });
  };

  drawText(`${firstname} ${lastname}`, 123, 686);

  if (birthday) {
    drawText(birthday, 123, 661);
  }

  if (birthplace) {
    drawText(birthplace, 92, 638);
  }

  drawText(`${address} ${zipcode} ${town}`, 134, 613);

  if (reasons.includes('travail')) {
    drawText('x', 76, 527, 19);
  }
  if (reasons.includes('courses')) {
    drawText('x', 76, 478, 19);
  }
  if (reasons.includes('sante')) {
    drawText('x', 76, 436, 19);
  }
  if (reasons.includes('famille')) {
    drawText('x', 76, 400, 19);
  }
  if (reasons.includes('sport')) {
    drawText('x', 76, 345, 19);
  }
  if (reasons.includes('judiciaire')) {
    drawText('x', 76, 298, 19);
  }
  if (reasons.includes('missions')) {
    drawText('x', 76, 260, 19);
  }

  if (town) {
    let locationSize = idealFontSize(font, town, 83, 7, 11);

    if (!locationSize) {
      alert(
        'Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. ' +
          'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.',
      );
      locationSize = 7;
    }

    drawText(town, 111, 226, locationSize);
  }

  if (!isEmpty(reasons)) {
    // Date sortie
    drawText(`${date}`, 92, 200);
    drawText(releaseHours, 200, 201);
    drawText(releaseMinutes, 220, 201);
  }

  // Date création
  drawText('Date de création:', 464, 150, 7);
  drawText(`${creationDate} à ${creationHour}`, 455, 144, 7);

  const generatedQR = await generateQR(data)

  if (generatedQR) {
    const qrImage = await pdfDoc.embedPng(generatedQR);

    page1.drawImage(qrImage, {
      x: page1.getWidth() - 170,
      y: 155,
      width: 100,
      height: 100,
    });

    pdfDoc.addPage();

    const page2 = pdfDoc.getPages()[1];

    page2.drawImage(qrImage, {
      x: 50,
      y: page2.getHeight() - 350,
      width: 300,
      height: 300,
    });
  }

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
};

const downloadBlob = (blob: Blob, fileName: string): void => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
};

const generate = async ({ reasons, ...profile }: FormState): Promise<void> => {
  // const invalid = validateAriaFields()
  // if (invalid) return

  if (!reasons)
    throw new Error('Reasons array is empty or undefined');

  const pdfBlob = await generatePdf(formatProfile(profile), reasons);

  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString('fr-FR');
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-');

  return downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`);
};

// $$('input').forEach((input) => {
//   const exempleElt = input.parentNode.parentNode.querySelector('.exemple')
//   const validitySpan = input.parentNode.parentNode.querySelector('.validity')
//   if (input.placeholder && exempleElt) {
//     input.addEventListener('input', (event) => {
//       if (input.value) {
//         exempleElt.innerHTML = 'ex.&nbsp;: ' + input.placeholder
//         validitySpan.removeAttribute('hidden')
//       } else {
//         exempleElt.innerHTML = ''
//       }
//     })
//   }
// })

// const conditions = {
//   '#field-firstname': {
//     condition: 'length',
//   },
//   '#field-lastname': {
//     condition: 'length',
//   },
//   '#field-birthday': {
//     condition: 'pattern',
//     pattern: /^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)/g,
//   },
//   '#field-lieunaissance': {
//     condition: 'length',
//   },
//   '#field-address': {
//     condition: 'length',
//   },
//   '#field-town': {
//     condition: 'length',
//   },
//   '#field-zipcode': {
//     condition: 'pattern',
//     pattern: /\d{5}/g,
//   },
//   '#field-datesortie': {
//     condition: 'pattern',
//     pattern: /\d{4}-\d{2}-\d{2}/g,
//   },
//   '#field-heuresortie': {
//     condition: 'pattern',
//     pattern: /\d{2}:\d{2}/g,
//   },
// }

// function validateAriaFields () {
//   return Object.keys(conditions).map(field => {
//     if (conditions[field].condition === 'pattern') {
//       const pattern = conditions[field].pattern
//       if ($(field).value.match(pattern)) {
//         $(field).setAttribute('aria-invalid', 'false')
//         return 0
//       } else {
//         $(field).setAttribute('aria-invalid', 'true')
//         $(field).focus()
//         return 1
//       }
//     }
//     if (conditions[field].condition === 'length') {
//       if ($(field).value.length > 0) {
//         $(field).setAttribute('aria-invalid', 'false')
//         return 0
//       } else {
//         $(field).setAttribute('aria-invalid', 'true')
//         $(field).focus()
//         return 1
//       }
//     }
//   }).some(x => x === 1)
// }

export {
  pad,
  generate,
  generatePdf,
  getFormattedDate,
};
