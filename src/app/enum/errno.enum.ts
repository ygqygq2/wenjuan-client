export enum Errno {
  SUCCESS = 0,
  ERRNO_10 = 10,
  ERRNO_11 = 11,
}

export const ErrMsg: Record<Errno, string> = {
  [Errno.SUCCESS]: '成功',
  [Errno.ERRNO_10]: '提交失败',
  [Errno.ERRNO_11]: '没有权限',
};
