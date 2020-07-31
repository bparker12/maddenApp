import React from "react"
import{ Table } from 'semantic-ui-react'

const RecruitTable = props => {

    return (
        <Table celled padded textAlign='center'>
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
                return (
                <Table.Row key={recruit.id}>
                    <Table.Cell selectable> {recruit.recruits.name} </Table.Cell>
                    <Table.Cell> {positionFilter(recruit.recruits.positionType, "position")} </Table.Cell>
                    <Table.Cell> {positionFilter(recruit.recruits.positionType, "type")} </Table.Cell>
                    <Table.Cell> {recruit.recruits.school} </Table.Cell>
                    <Table.Cell> {recruit.headline} </Table.Cell>
                    <Table.Cell> {recruit.newsWeek} </Table.Cell>
                    <Table.Cell> {recruit.recruits.projected_draft_round} </Table.Cell>
                    <Table.Cell> {recruit.recruits.projected_draft_number} </Table.Cell>
                    <Table.Cell> {recruit.recruits.scouted_draft_position} {roundEnd(recruit.recruits.scouted_draft_round)} </Table.Cell>
                </Table.Row>
            )
            })
            }
        </Table.Body>


        </Table>
    )
}
export default RecruitTable