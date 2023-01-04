import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 5,
});

class ToastMessages {
  openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    notification[type]({
      message: message,
      description: description
    })
  }

  getToastFn = (message: string, description?: string, error?: boolean) => {
    const typeFn = error ? 'error' : 'success'
    this.openNotificationWithIcon(typeFn, message, description)
  }

  successToast = (message: string, description?: string, error?: boolean) => {
    this.getToastFn(message, description)
  }

  errorToast = (message: string, description?: string, error?: boolean) => {
    this.getToastFn(message, description, true)
  }
}

export default new ToastMessages()
