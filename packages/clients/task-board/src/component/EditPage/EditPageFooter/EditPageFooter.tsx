import React from 'react';
import classes from '../EditPage.module.scss';
import { useCustomizations, useDeviceContext } from '@harmonie/services';
import { DefaultButton, PrimaryButton, Icon, Spinner, Text, Tooltip } from '@harmonie/ui';

const textStyle = { lineHeight: '32px' };
interface EditPageFooterPros {
  errorMessage: any;
  loading: any;
  onBack: any;
  doShareMail: any;
  disable: any;
}
export default function EditPageFooter({ errorMessage, loading, onBack, doShareMail, disable }: EditPageFooterPros) {
  const { isMobile } = useDeviceContext();

  const content = (
    <Tooltip>
      <h1>Share email</h1>
      <div>Click to share a email with you`r teammates</div>
    </Tooltip>
  );
  const { sementicColors } = useCustomizations();
  const { palette } = sementicColors;

  return (
    <div className={classes['bottom']}>
      {errorMessage && (
        <div className={classes['share-error']} style={{ color: palette.redDark }}>
          <Icon iconName="ErrorBadge" />
          <Text>{errorMessage}</Text>
        </div>
      )}

      <DefaultButton disabled={disable} text="Back" onClick={onBack} />

      {doShareMail &&
        (isMobile ? (
          <PrimaryButton disabled={disable} onClick={doShareMail}>
            {loading && (
              <span>
                <Text style={textStyle}>Creating...</Text>
                <Spinner title="loading" />
              </span>
            )}

            {!loading && 'Share email'}
          </PrimaryButton>
        ) : (
          <Tooltip content={content} hidden={disable}>
            <PrimaryButton disabled={disable} onClick={doShareMail}>
              {loading && (
                <span>
                  <Text style={textStyle}>Creating...</Text>
                  <Spinner title="loading" />
                </span>
              )}

              {!loading && 'Share email'}
            </PrimaryButton>
          </Tooltip>
        ))}
    </div>
  );
}
