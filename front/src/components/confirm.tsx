import { Modal, ModalFuncProps } from 'antd';

export const Confirm = ({
  title = 'Confirma essa ação?',
  content = 'Essa ação não poderá ser desfeita',
  okText = 'Sim',
  cancelText = 'Não',
  okType = 'danger',
  onOk,
  onCancel,
}: ModalFuncProps) => {
  const { confirm } = Modal;

  confirm({
    title,
    content,
    okText,
    cancelText,
    okType,
    onOk,
    onCancel,
  });
};
