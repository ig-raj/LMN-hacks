import React, { useEffect, useState } from 'react';
import { askDoubtService } from '../../services/askDoubtService';

const PeerCollaboration = ({ questionId }) => {
    const [collaboration, setCollaboration] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchCollaboration = async () => {
            try {
                const result = await askDoubtService.createPeerCollaboration(questionId , studentIds);
                if (result.documents.length > 0) {
                    setCollaboration(result.documents[0]);
                    setNotes(result.documents[0].CollaborationNotes || '');
                }
            } catch (error) {
                console.error('Error fetching collaboration session:', error);
            }
        };

        fetchCollaboration();
    }, [questionId]);

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSaveNotes = async () => {
        try {
            await askDoubtService.addCollaborationNotes(collaboration.$id, notes);
            alert('Collaboration notes updated.');
        } catch (error) {
            console.error('Error saving collaboration notes:', error);
            alert('Failed to update notes.');
        }
    };

    return (
        <div>
            <h3>Peer Collaboration</h3>
            {collaboration ? (
                <div>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Collaboration notes"
                    />
                    <button onClick={handleSaveNotes}>Save Notes</button>
                </div>
            ) : (
                <p>No active collaboration session for this question.</p>
            )}
        </div>
    );
};

export default PeerCollaboration;
