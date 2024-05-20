package com.ssafy.challs.domain.blockchain.dto.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AwardsChainRequestDto(
	@Schema(description = "블록체인의 타입", example = "award")
	String type,
	@Schema(description = "대회를 주최한 팀 이름", example = "팀이름")
	String organizer,
	@Schema(description = "대회 이름", example = "대회이름")
	@JsonProperty("event_name")
	String eventName,
	@Schema(description = "수상일", example = "2024-05-12")
	@JsonProperty("award_date")
	LocalDate awardDate,
	@Schema(description = "수상자 이름", example = "홍길동")
	@JsonProperty("recipient_name")
	String recipientName,
	@Schema(description = "수상자 고유 코드", example = "UUID")
	@JsonProperty("recipient_code")
	String recipientCode,
	@Schema(description = "블록체인 고유 코드", example = "UUID")
	String code,
	@Schema(description = "상 이름", example = "금상")
	@JsonProperty("award_type")
	String awardType
) implements BlockChainRequest {
}
