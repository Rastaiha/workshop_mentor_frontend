import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { deleteWidgetAction } from '../../../redux/slices/widget';

function DeleteWidgetDialog({
  handleClose,
  deleteWidget,

  open,
  widgetId
}) {
  const t = useTranslate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('removeWidget')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('wantRemoveWidget')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          {'لغو'}
        </Button>
        <Button
          onClick={() => {
            deleteWidget({ widgetId });
            handleClose();
          }}
          color="primary"
          variant="contained">
          {'حذف'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { deleteWidget: deleteWidgetAction })(
  DeleteWidgetDialog
);
