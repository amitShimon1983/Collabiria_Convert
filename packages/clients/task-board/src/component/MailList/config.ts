import { gql } from '@harmonie/services';

export const GET_MAILS_QUERY = gql`
  query GetMailsQuery($onlyRead: Boolean, $searchTerm: String, $scope: String, $endCursor: String) {
    getMails(args: { onlyRead: $onlyRead, searchTerm: $searchTerm, scope: $scope, endCursor: $endCursor }) {
      results {
        messageId
        mailboxId
        dismissed
        internetMessageId
        conversationId
        conversationIndex
        parentFolderId
        createdDateTime
        lastModifiedDateTime
        receivedDateTime
        sentDateTime
        hasAttachments
        subject
        from {
          emailAddress {
            address
            name
          }
        }
        sender {
          emailAddress {
            address
            name
          }
        }
        replyTo {
          emailAddress {
            address
            name
          }
        }
        bccRecipients {
          emailAddress {
            address
            name
          }
        }
        ccRecipients {
          emailAddress {
            address
            name
          }
        }
        toRecipients {
          emailAddress {
            address
            name
          }
        }
        body {
          content
          contentType
        }
        bodyPreview
        importance
        isDraft
        isRead
        webLink
        attachments {
          attachmentId
          name
          contentType
          size
          isInline
          contentId
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export const DISMISS_EMAIL_MUTATION = gql`
  mutation DismissEmail($messageId: String!, $taskBoardId: String) {
    dismissEmail(args: { messageId: $messageId, taskBoardId: $taskBoardId }) {
      conversationId
      id
    }
  }
`;

export const GET_POTENTIAL_TASKS_QUERY = gql`
  query getPotentialTasksEmails(
    $weeksNum: Float!
    $onlyRead: Boolean
    $searchTerm: String
    $scope: String
    $endCursor: String
  ) {
    getPotentialTasksEmails(
      args: { weeksNum: $weeksNum, onlyRead: $onlyRead, searchTerm: $searchTerm, scope: $scope, endCursor: $endCursor }
    ) {
      isAuthorized
      results {
        id
        taskId
        subject
        from {
          name
          address
        }
        to {
          name
          address
        }
        sentDateTime
        lastModifiedDateTime
        conversationId
        previewText
        body
        attachments {
          id
          name
          size
          type
        }
        isRead
        isTopResult
        isRestricted
        webLink
        inferenceClassification
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
