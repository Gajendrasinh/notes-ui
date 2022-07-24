import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
	catchError,
	map,
	switchMap,
	tap,
	withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { selectRecordingId } from '.';
import { RecordingDetailsConfig } from '../recording-details.config';
import { RecordingDetailsService } from '../services/recording-details.service';
import * as RecordingDetailsActions from './recording-details.actions';

@Injectable()
export class RecordingDetailsEffects {
	LOADER_IDS = RecordingDetailsConfig.LOADER_IDS;

	constructor(
		private actions$: Actions,
		private store: Store,
		private router: Router,
		private recordingDetailsService: RecordingDetailsService,
		private utilityService: UtilityService,
		private notificationService: NotificationService,
		private authService: AuthService
	) {}

	getRecordingDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getRecordingDetails),
			tap(() =>
				this.utilityService.startLoader(this.LOADER_IDS.MEETING_DETAILS)
			),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getRecordingDetails(recordingId).pipe(
					tap((recordingDetails) => {
						if (!recordingDetails) {
							this.router.navigateByUrl('/e/page-not-found');
						}
					}),
					map((recordingDetails) =>
						RecordingDetailsActions.getRecordingDetailsSuccess({
							recordingDetails,
						})
					),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.MEETING_DETAILS)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	getTranscripts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getTranscripts),
			tap(({ recordingId }) => {
				this.utilityService.startLoader(this.LOADER_IDS.TRANSCRIPTS_PANEL);
				/** Set authorization cookie */
				this.authService.updateAuthCookie(
					ApiConstants.AUDIO_VIDEO_URL(recordingId)
				);
			}),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getTranscripts(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.transcripts && data.transcripts.length) {
							return RecordingDetailsActions.getTranscriptsSuccess(data);
						} else {
							return RecordingDetailsActions.getTranscriptsEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.TRANSCRIPTS_PANEL)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	getParticipantDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getParticipantDetails),
			tap(() =>
				this.utilityService.startLoader(this.LOADER_IDS.PARTICIPANT_DETAILS)
			),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getParticipantDetails(recordingId).pipe(
					map((participantDetails) =>
						RecordingDetailsActions.getParticipantDetailsSuccess({
							participantDetails,
						})
					),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.PARTICIPANT_DETAILS)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	getTalkRatioDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getTalkRatioDetails),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getTalkRatioDetails(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.eventTalkRatioDto) {
							return RecordingDetailsActions.getTalkRatioDetailsSuccess({
								talkRatioDetails: data,
							});
						} else {
							return RecordingDetailsActions.getTalkRatioEmptyMessage({
								message: status.description,
							});
						}
					}),
					catchError(() => EMPTY)
				)
			)
		);
	});

	getTopicsDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getTopics),
			tap(() => this.utilityService.startLoader(this.LOADER_IDS.TOPICS)),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getTopicsDetails(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.topics.length) {
							return RecordingDetailsActions.getTopicsSuccess({
								topicsDetails: data,
							});
						} else {
							return RecordingDetailsActions.getTopicEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(() => this.utilityService.stopLoader(this.LOADER_IDS.TOPICS)),
					catchError(() => EMPTY)
				)
			)
		);
	});

	/* Get Action Item */
	getActionItemDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getActionItem),
			tap(() => this.utilityService.startLoader(this.LOADER_IDS.ACTION_ITEMS)),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getActionItems(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.length) {
							return RecordingDetailsActions.getActionItemSuccess({
								actionItems: data,
							});
						} else {
							return RecordingDetailsActions.getActionItemEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.ACTION_ITEMS)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	/* Get Question List */
	getQuestionList$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.getQuestionList),
			tap(() => this.utilityService.startLoader(this.LOADER_IDS.QUESTION_LIST)),
			switchMap(({ recordingId }) =>
				this.recordingDetailsService.getQuestionList(recordingId).pipe(
					map(({ data, status }) => {
						if (data && data.length) {
							return RecordingDetailsActions.getQuestionListSuccess({
								questionList: data,
							});
						} else {
							return RecordingDetailsActions.getQuestionListEmptyMessage({
								message: status.description,
							});
						}
					}),
					tap(() =>
						this.utilityService.stopLoader(this.LOADER_IDS.QUESTION_LIST)
					),
					catchError(() => EMPTY)
				)
			)
		);
	});

	updateNonOrgName$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.updateNonOrgName),
			tap(() =>
				this.utilityService.startLoader(
					this.LOADER_IDS.RECORDING_DETAIL_HEADER_PANEL
				)
			),
			switchMap(({ recordingId, nonOrgName }) =>
				this.recordingDetailsService
					.updateNonOrgName(recordingId, nonOrgName)
					.pipe(
						map(() =>
							RecordingDetailsActions.updateNonOrgNameSuccess({ nonOrgName })
						),
						tap(() =>
							this.utilityService.stopLoader(
								this.LOADER_IDS.RECORDING_DETAIL_HEADER_PANEL
							)
						),
						catchError(() => EMPTY)
					)
			)
		);
	});

	// TODO: Where
	updateConversationTranscript$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.updateTranscript),
			tap(({ conversation }) =>
				this.utilityService.startLoader(
					this.LOADER_IDS.CONVERSATION(conversation.dialogueId)
				)
			),
			withLatestFrom(this.store.select(selectRecordingId)),
			switchMap(([{ conversationCardId, conversation } /* , recordingId */]) =>
				this.recordingDetailsService
					.updateTranscript(/* recordingId!, conversation */)
					.pipe(
						map(({ success }) => {
							if (success) {
								return RecordingDetailsActions.updateTranscriptSuccess({
									conversationCardId,
									conversation,
								});
							} else {
								this.notificationService.showNotification(
									'Transcript update failed, Please try again later.',
									'error'
								);
								return RecordingDetailsActions.updateTranscriptFail({
									conversationCardId,
									conversation,
								});
							}
						}),
						tap(() =>
							this.utilityService.stopLoader(
								this.LOADER_IDS.CONVERSATION(conversation.dialogueId)
							)
						),
						catchError(() => EMPTY)
					)
			)
		);
	});

	updateSpeaker$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(RecordingDetailsActions.updateSpeaker),
			tap(({ dialogueId }) =>
				this.utilityService.startLoader(
					this.LOADER_IDS.CONVERSATION(dialogueId)
				)
			),
			withLatestFrom(this.store.select(selectRecordingId)),
			switchMap(
				([{ dialogueId, speaker, allConversation, oldSpeaker }, recordingId]) =>
					this.recordingDetailsService
						.updateSpeaker(recordingId!, dialogueId, speaker, allConversation)
						.pipe(
							map(({ status }) => {
								if (status) {
									this.store.dispatch(
										RecordingDetailsActions.getParticipantDetails({
											recordingId: recordingId!,
										})
									);
									this.store.dispatch(
										RecordingDetailsActions.getTalkRatioDetails({
											recordingId: recordingId!,
										})
									);
									this.store.dispatch(
										RecordingDetailsActions.getActionItem({
											recordingId: recordingId!,
										})
									);
									this.store.dispatch(
										RecordingDetailsActions.getQuestionList({
											recordingId: recordingId!,
										})
									);
									return RecordingDetailsActions.updateSpeakerSuccess({
										dialogueId,
										oldSpeaker,
										speaker: {
											name: speaker.name,
											emailId: speaker.emailId,
											editable: false,
											designation: speaker.designation,
											isOrgUser: speaker.organization,
										},
										allConversation,
									});
								} else {
									this.notificationService.showNotification(
										'Speaker update failed, Please try again later.',
										'error'
									);
									return RecordingDetailsActions.updateSpeakerFail({
										dialogueId,
									});
								}
							}),
							tap(() =>
								this.utilityService.stopLoader(
									this.LOADER_IDS.CONVERSATION(dialogueId)
								)
							),
							catchError(() => EMPTY)
						)
			)
		);
	});
}
