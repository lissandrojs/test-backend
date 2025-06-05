export class ExternalQueueDto {
  id: number;
  name: string;
  connected: boolean;
  authenticated: boolean;
  authenticatedNumber: string;
  enabled: boolean;
  type: string;
  openChats: number;
  chatsOnQueue: number;
  todaysAvgContactTime: number;
  todaysAvgAnswerTime: number;
  todaysRespondedChats: number;
  todaysSurveyGrade: number;
  todaysRespondedSurveys: number;
  ivrId: number;
  loggedAgentsCount: number;
}
