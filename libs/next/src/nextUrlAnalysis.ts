/**
 * 解析nextUrl
 * @param nextUrl
 * @returns
 */
export const nextUrlAnalysis = (
  nextUrl: string,
): {
  key: string;
  isParam: boolean;
  optional: boolean;
}[] => {
  const splits = nextUrl.split('/');
  return splits.map((item: string) => {
    if (item[item.length - 1] !== ']') {
      return {
        key: item,
        optional: false,
        isParam: false,
      };
    }
    let arr = item.split('');
    let stack = [];
    let isParam = false;
    let optional = false;
    let hasClose = false;
    let key = '';
    while (arr.length) {
      if (arr[arr.length - 1] !== '[') {
        if (arr[arr.length - 1] !== ']') {
          stack.push(arr[arr.length - 1]);
        }
      } else {
        while (stack.length) {
          const temp = stack[stack.length - 1];
          if (
            ('0' <= temp && temp <= '9') ||
            ('a' <= temp && temp <= 'z') ||
            ('A' <= temp && temp <= 'Z') ||
            ['_', '$'].includes(temp)
          ) {
            key += temp;
          } else {
            if (!isParam) {
              isParam = true;
            }
          }
          stack.pop();
        }
        if (!hasClose) {
          hasClose = true;
        } else {
          optional = true;
        }
      }
      arr.pop();
    }
    return {
      key,
      optional,
      isParam,
    };
  });
};
