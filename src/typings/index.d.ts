/*
    https://github.com/jquense/yup/issues/312#issuecomment-442854307

    Lib Core: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/yup/yup-tests.ts

    But it works: https://xakplant.ru/2020/10/09/yup-ref-get-value/
*/

import { NumberSchema, StringSchema, Reference } from 'yup'

declare module 'yup' {
  interface NumberSchema {
    lessThanOtherField(r: Reference<unknown>, m: string): NumberSchema
  }
}

// For React 18
declare module 'react-progressive-graceful-image' {
  interface ProgressiveImageProps {
    children: (string, boolean, SrcSetData) => React.ReactNode
  }
}
