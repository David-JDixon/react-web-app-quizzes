import QuizList from "./QuizList";
function QList() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-9">
                    <h2>Quizzes</h2>
                    <QuizList />
            </div>
        </div>
    </div>
    );
}
export default QList;