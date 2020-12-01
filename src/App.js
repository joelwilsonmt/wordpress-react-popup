import React from 'react'
import styled from "styled-components"

import Modal from './components/Modal'

const StyledModal = styled(Modal)`
	&.modal-underlay {
		background-color: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
		z-index: 2147483003; /* this oddly specific z-index is to lay over Intercom's dialog, which has a z-index of 2147483001 */
		top: 0;
		left: 0;
		position: fixed;
		animation: fadein .5s;
	}
	@keyframes fadein {
		from {
		opacity: 0;
		}
		to {
		opacity: 1;
		}
	}
	.modal-window {
		background-color: white;
		height: auto;
		max-height: 90vh;
		width: 75vw;
		max-width: 700px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 70px 83px 70px 80px;
	}

	.modal-close-button {
		color: #333;
		position: absolute;
		top: 20px;
		right: 25px;
		width: 48px;
	}
	.modal-close-button:hover {
		cursor: pointer;
	}
	.modal-header, .modal-sub-header {
		text-align: left;
		margin: 0;
		margin-bottom: 10px;
		line-height: 1em;
		color: #333333;
	}
	.modal-header {
		font-size: 28px;
		font-weight: 600;
		line-height: 32px;
	}
	.modal-sub-header {
		font-size: 20px;
		line-height: 24px;
		margin-bottom: 44px;
	}
	.left-wrapper {
		margin-right: 25%;
	}

	.modal-plane {
		float: right;
		max-width: 20%;
	}
	.mobile-plane {
		display: none;
	}
	@media screen and (max-width: 860px) {
		.mobile-plane {
			display: block;
			width: 140px;
			padding: 15px;
			padding-right: none;
			padding-top: none;
		}
		.large-plane {
			display: none;
		}
		.modal-header {
			font-size: 26px;
		}
		.modal-sub-header {
			font-size: 18px;
		}
	}
	@media screen and (max-width: 650px) {
		.modal-plane, .mobile-plane {
			display: none;
		}
		.modal-header {
			font-size: 24px;
		}
		.modal-sub-header {
			font-size: 16px;
		}
		.left-wrapper {
			margin-right: 0;
		}
		.modal-close-button {
			width: 25px;
			right: 45px;
		}
	}
	@media screen and (max-width: 576px) {
		.modal-window {
				width: 90vw;
				padding: 70px 50px 50px;
		}
		
	}

`

export default () => {
	return <StyledModal />
}
