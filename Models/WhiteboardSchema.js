const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./UserSchema');

var BoardSchema = new Schema({
    title: String,
    description: String,
    data: [
        {
            data: {},
            created_by:{type: Schema.Types.ObjectId, ref: 'User'}
        }
    ],
    team: [{"type": Schema.Types.ObjectId, "ref": "User"}],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var Whiteboard = mongoose.model('Whiteboard', BoardSchema);
module.exports = Whiteboard;

module.exports.createBoard = function(board,cb){
    board.save(cb);
}

module.exports.getByIdWithOptions = function(id,opt,cb){
    Whiteboard.findById(id,opt, cb);
}
module.exports.getByIdAndPopulate = function(id,opt,cb){
    Whiteboard.findById(id).populate('team').exec(function(err,player){
        cb(err,player);
    });
};
module.exports.addNewTeamMemberByUserId = function(boardid, userid,cb){
    console.log(boardid);
    Whiteboard.update({_id:boardid}, {$push: {"team": userid}},{safe: true, upsert: true},cb);
};