import React from 'react';
import styled from 'styled-components';
import { Persona } from '@harmonie/ui';
import { useProfilePicture, utils } from '@harmonie/services';

const SubjectAndEditContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: baseline;
`;
interface MailHeaderProps {
  fromAddress: any;
  subject: any;
  sentDateTime: any;
}
const MailHeader = ({ fromAddress, subject, sentDateTime }: MailHeaderProps) => {
  const profilePic = useProfilePicture(fromAddress);
  return (
    <div className="main-header-details">
      <Persona imageUrl={profilePic} text={fromAddress} size={3} />
      <SubjectAndEditContainer>
        <div className="subject-and-sent-date">
          <div className="title">{subject}</div>
          <div>{utils.getRelativeDisplayDate(new Date(sentDateTime))}</div>
        </div>
      </SubjectAndEditContainer>
    </div>
  );
};

export default MailHeader;
