module.exports = ({github, context}) => {
  github.issues.createComment({
    issue_number: context.payload.issue.number,
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    body: `You said ${context.payload.comment.body}`
  })
}
