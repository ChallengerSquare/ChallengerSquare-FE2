from uuid import uuid4
from flask import Flask, jsonify, request
from blockchain import Blockchain
from smart_contract import SmartContract
from schedule import start_scheduler

app = Flask(__name__)

node_address = str(uuid4()).replace('-', '')
blockchain = Blockchain()
smart_contract = SmartContract(blockchain)


@app.route('/mine_block', methods=['GET'])
def mine_block():
    previous_block = blockchain.get_previous_block()
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof, previous_hash)

    response = {'message': 'Congratulations, you just mine a block!!',
                'index': block['index'],
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash'],
                'transactions': block['transactions']}

    return jsonify(response), 200


@app.route('/get_chain', methods=['GET'])
def get_chain():
    response = {'chain': blockchain.chain,
                'length': len(blockchain.chain)}

    return jsonify(response), 200


@app.route('/is_valid', methods=['GET'])
def is_valid():
    if blockchain.is_chain_valid(blockchain.chain):
        response = {'message': 'All good. The Blockchain is valid!'}
    else:
        response = {'message': 'We have a problem!!'}

    return jsonify(response), 200


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    try:
        transaction_json = request.get_json()
        message = smart_contract.execute_transaction(transaction_json)  # 트랜잭션 실행 및 유효성 검증 포함
        response = {'message': message}
        return jsonify(response), 201  # 성공적으로 처리됨
    except ValueError as e:  # 유효성 검증 실패시 예외 처리
        return jsonify({'error': str(e)}), 400


# todo : node 를 탐색해서 connect 하도록
# todo : node 탐색 기준 설정
@app.route('/connect_node', methods=['POST'])
def connect_node():
    json = request.get_json()
    nodes = json.get('nodes')
    if nodes is None:
        return 'No nodes provided', 400

    for node in nodes:
        blockchain.add_node(node)
    response = {'message': 'All the nodes now connected. The hadcoin Blockchain now contains the following nodes',
                'total_nodes': list(blockchain.nodes)}
    return jsonify(response), 201


@app.route('/replace_chain', methods=['GET'])  # todo : chain 길이가 같을 때 어떻게 할건지 추가
def replace_chain():
    is_chain_replaced = blockchain.replace_chain()
    if is_chain_replaced:
        response = {'message': 'The node had different chains so the chain was replaced by the longest chain',
                    'new_chain': blockchain.chain}
    else:
        response = {'message': 'All good. The chain is the largest one',
                    'actual_chain': blockchain.chain}

    return jsonify(response), 200


# Running the app
if __name__ == '__main__':
    start_scheduler()
    app.run(host='0.0.0.0', port=5000)
