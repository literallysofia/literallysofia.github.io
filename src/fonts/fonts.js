import { css } from 'styled-components';

import PlayfairDisplayBlackTTF from './Playfair_Display/PlayfairDisplay-Black.ttf';
import PlayfairDisplayBoldTTF from './Playfair_Display/PlayfairDisplay-Bold.ttf';
import RalewayBoldTTF from './Raleway/Raleway-Bold.ttf';
import RalewayRegularTTF from './Raleway/Raleway-Regular.ttf';
import PoppinsBoldTTF from './Poppins/Poppins-Bold.ttf';
import PoppinsBoldItalicTTF from './Poppins/Poppins-BoldItalic.ttf';
import PoppinsSemiBoldTTF from './Poppins/Poppins-SemiBold.ttf';
import PoppinsRegularTTF from './Poppins/Poppins-Regular.ttf';
import PoppinsRegularItalicTTF from './Poppins/Poppins-Italic.ttf';

const FontFaces = css`
  @font-face {
    font-family: 'Playfair Display';
    src: url(${PlayfairDisplayBlackTTF}) format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Playfair Display';
    src: url(${PlayfairDisplayBoldTTF}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${RalewayBoldTTF}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Raleway';
    src: url(${RalewayRegularTTF}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBoldTTF}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBoldItalicTTF}) format('truetype');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsSemiBoldTTF}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegularTTF}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegularItalicTTF}) format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
`;

export default FontFaces;
