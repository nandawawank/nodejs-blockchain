import Transactions from '../models/transactions.js'
import Blockchain from '../models/blockchain.js'
import Nodes from '../models/nodes.js';

export default class BlockchainController {
    constructor(url, port) {
        this.blockchain = new Blockchain(url, port);
        this.nodes = new Nodes(url, port);
        this.transactions = new Transactions();
    }

    resolve(req, res) {
        this.nodes.resolve(res, this.blockchain);
    }

    getNodes(req, res) {
        res.json(this.nodes.list);
    }

    postTransaction(req, res) {
        this.transactions.add(req, res);
    }

    getTransactions(req, res) {
        res.json(this.transactions.get());
    }

    mine(req, res) {
        res.json(this.blockchain.mine(this.transactions, res));
    }

    getBlockchain(req, res) {
        res.json(this.blockchain.blocks);
    }

    getBlockByIndex(req, res) {
        res.json(this.blockchain.getBlockByIndex(req.params.idx));
    }

    getBlockLastIndex(req, res) {
        res.json(this.blockchain.getBlockLastIndex());
    }
}