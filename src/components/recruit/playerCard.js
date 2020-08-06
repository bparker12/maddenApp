import React from "react"
import { Card, Grid } from "semantic-ui-react"

const PlayerCard = props => {

    const recruit = props.recruit.recruits
    const news = props.recruit

    return (

        <Card centered raised fluid>
            <Card.Content>
                <Card.Header textAlign='center'> <h2> {recruit.name} </h2>  </Card.Header>
            </Card.Content>
            <Card.Content>
                <Grid>
                    <Grid.Row columns={2} divided>
                        <Grid.Column>
                            <Card.Description textAlign='center'>
                                <strong>Postion:</strong> {props.posFilter(recruit.positionType, "position")}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                                <strong>Type:</strong> {props.posFilter(recruit.positionType, "type")}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                                <strong>School:</strong> {recruit.school}
                            </Card.Description>
                        </Grid.Column>
                        <Grid.Column>
                            <Card.Description textAlign='center'>
                                <strong>Projected Draft Round</strong> {recruit.projected_draft_round}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                                <strong>Projected Draft Number</strong> {recruit.projected_draft_number}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                                <strong>Scouted Draft Projection</strong> {recruit.scouted_draft_position} {recruit.scouted_draft_round}
                            </Card.Description>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Header textAlign='center'>
                                <h3>News</h3>
                            </Card.Header>
                            <Card.Description textAlign='center'>
                                <strong>Week of News:</strong> {news.newsWeek}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                               <strong>Headline:</strong> {news.headline}
                            </Card.Description>
                            <Card.Description textAlign='center'>
                                <strong>News:</strong> {news.news}
                            </Card.Description>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>

    )

}
export default PlayerCard