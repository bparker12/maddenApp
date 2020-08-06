import React, { useState } from "react"
import{ Table, Button, Modal, Confirm } from 'semantic-ui-react'
import PlayerCard from "./playerCard"
import apiManager from "../../modules/apiManager"

const RecruitTable = props => {

    const [open, setConfirm] = useState(false)
    const [openModal, setModal] = useState(false)
    const [modalPlayer, setModalPlayer] = useState()

    const toggleModal = (object) => {
            setModalPlayer(object)
            setModal(!openModal)
        }
    
    const toggleConfirm = (id) => {
        console.log(id, "delete click")
        setModalPlayer(id)
        setConfirm(!open)
    }

    return (
        <Table celled padded selectable striped textAlign='center'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>School</Table.HeaderCell>
                <Table.HeaderCell>Headline</Table.HeaderCell>
                <Table.HeaderCell>Week of News</Table.HeaderCell>
                <Table.HeaderCell>Projected Draft Round</Table.HeaderCell>
                <Table.HeaderCell>Projected Draft Position</Table.HeaderCell>
                <Table.HeaderCell>True Talent Position</Table.HeaderCell>
                <Table.HeaderCell>News</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {props.recruits.map(recruit => {
                const roundEnd = (round) => {
                    if(round === 1){
                        return round + "st"
                    } else if(round === 2){
                        return round + "nd"
                    } else if(round === 3){
                        return round + "rd"
                    } else if(round === 4 || 5 || 6 || 7){
                        return round + "th"
                    }
                }
                const positionFilter = (recruitPosition, misc) => {
                    let position = props.positionTypes.find(pos => pos.id === recruitPosition)
                    if(misc === "position"){
                    return position.positions.name
                    } else if(misc === "type"){
                    return position.types.name
                    }
                }

                const deletePlayer = (id, id2) => {
                    apiManager.deleteTwo("draftNews", id, "recruits", id2, `yearsId=${props.currentYear}&_expand=years&_expand=recruits&_sort=newsWeek`)
                    .then(recruits =>
                    props.setRecruits(recruits))
                    toggleModal()
                }
                return (
                    <React.Fragment key={recruit.id}>
                        <Table.Row id={recruit.id}  onClick={() => toggleModal(recruit)}>
                            <Table.Cell > {recruit.recruits.name} </Table.Cell>
                            <Table.Cell> {positionFilter(recruit.recruits.positionType, "position")} </Table.Cell>
                            <Table.Cell> {positionFilter(recruit.recruits.positionType, "type")} </Table.Cell>
                            <Table.Cell> {recruit.recruits.school} </Table.Cell>
                            <Table.Cell> {recruit.headline} </Table.Cell>
                            <Table.Cell> {recruit.newsWeek} </Table.Cell>
                            <Table.Cell> {recruit.recruits.projected_draft_round} </Table.Cell>
                            <Table.Cell> {recruit.recruits.projected_draft_number} </Table.Cell>
                            <Table.Cell> {recruit.recruits.scouted_draft_position} {roundEnd(recruit.recruits.scouted_draft_round)} </Table.Cell>
                            <Table.Cell> {recruit.news} </Table.Cell>
                        </Table.Row>
                            <Modal
                            closeIcon
                            open={openModal}
                            onCancel={() => setModal(!openModal)}
                            onClose={() => setModal(!openModal)}
                            >
                                <Modal.Content>
                                        <PlayerCard recruit={modalPlayer} positionTypes={props.positionTypes} posFilter={positionFilter}
                                        roundEnd={roundEnd}    
                                        />
                                    <Button fluid> Edit </Button>
                                    <Button fluid onClick={() => deletePlayer(recruit.id, recruit.recruitsId)}> Delete </Button>
                                </Modal.Content>
                            </Modal>
                        {/* <Confirm open={open} onCancel={() => setConfirm(!open)} onConfirm={() => deletePlayer(recruit.id)} /> */}
                    </React.Fragment>
            )
            })
            }
        </Table.Body>
        </Table>
    )
}
export default RecruitTable