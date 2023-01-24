import { Routes, Route } from "react-router-dom";
import VocLayout from "./Vocabulary/VocLayout";
import Administration from "./Vocabulary/Administration"
import EntireVocabulary from "./Vocabulary/EntireVocabulary"

const Vocabulary = () => {
    return (
        <Routes>
            <Route path='/' element={<VocLayout />}>
                <Route path="/administration" element={<Administration />} />
                <Route path="/vocabulary" element={<EntireVocabulary />} />
            </Route>
        </Routes>        
    )
}

export default Vocabulary