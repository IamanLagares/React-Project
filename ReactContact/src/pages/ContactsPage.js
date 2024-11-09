import React, { useState, useEffect } from 'react';
import styles from './ContactsPage.module.css'; // Importe o arquivo CSS modular

const ContactsPage = () => {
  const [itens, setItens] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [editIndex, setEditIndex] = useState(undefined);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    redesSociais: '',
    observacao: '',
    categoria: 'Amigos',
    idade: '',
    cpf: ''
  });

  useEffect(() => {
    loadItens();
  }, []);

  const loadItens = () => {
    fetch('http://localhost:3000/contacts')
      .then(response => response.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao carregar itens:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const openModal = (edit = false, index = 0) => {
    setModalActive(true);
    if (edit) {
      const item = itens[index];
      setFormData({
        nome: item.nome,
        telefone: item.telefone,
        email: item.email,
        endereco: item.endereco,
        redesSociais: item.redesSociais,
        observacao: item.observacao,
        categoria: item.categoria,
        idade: item.idade,
        cpf: item.cpf
      });
      setEditIndex(index);
    } else {
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        redesSociais: '',
        observacao: '',
        categoria: 'Amigos',
        idade: '',
        cpf: ''
      });
      setEditIndex(undefined);
    }
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone || !formData.email) {
      alert('Nome, telefone e e-mail são obrigatórios!');
      return;
    }

    const method = editIndex !== undefined ? 'PUT' : 'POST';
    const url = editIndex !== undefined
      ? `http://localhost:3000/contacts/${itens[editIndex].id}`
      : 'http://localhost:3000/contacts';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (editIndex === undefined) {
          setItens(prevItens => [...prevItens, data]);
        } else {
          setItens(prevItens => {
            const updatedItens = [...prevItens];
            updatedItens[editIndex] = data;
            return updatedItens;
          });
          setEditIndex(undefined);
        }
        closeModal();
      })
      .catch(error => {
        console.error('Erro ao salvar:', error);
        alert('Ocorreu um erro ao salvar os dados.');
      });
  };

  const deleteItem = (index) => {
    const itemId = itens[index].id;
    fetch(`http://localhost:3000/contacts/${itemId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setItens(prevItens => prevItens.filter((_, i) => i !== index));
      })
      .catch(error => console.error('Erro ao deletar:', error));
  };

  const toggleDetails = (index) => {
    const updatedItens = [...itens];
    updatedItens[index].showDetails = !updatedItens[index].showDetails;
    setItens(updatedItens);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <span>Cadastro de Contatos</span>
      </div>
      <div className={styles.divTable}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th className={styles.acao}>Editar</th>
              <th className={styles.acao}>Excluir</th>
              <th className={styles.acao}>Mais</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.telefone}</td>
                  <td>{item.email}</td>
                  <td className={styles.acao}>
                    <button onClick={() => openModal(true, index)} title="Editar">
                      <i className='bx bx-edit'></i>
                    </button>
                  </td>
                  <td className={styles.acao}>
                    <button onClick={() => deleteItem(index)} title="Excluir">
                      <i className='bx bx-trash'></i>
                    </button>
                  </td>
                  <td className={styles.acao}>
                    <button onClick={() => toggleDetails(index)} title="Mais">
                      <i className={`bx ${item.showDetails ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                    </button>
                  </td>
                </tr>
                {item.showDetails && (
                  <tr>
                    <td colSpan="6">
                      <div className={styles.detailsContent}>
                        <p><strong>Endereço:</strong> {item.endereco}</p>
                        <p><strong>Redes Sociais:</strong> {item.redesSociais}</p>
                        <p><strong>Categoria:</strong> {item.categoria}</p>
                        <p><strong>Idade:</strong> {item.idade}</p>
                        <p><strong>CPF:</strong> {item.cpf}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {modalActive && (
        <div className={`${styles.modalContainer} ${styles.active}`}>
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="m-nome">Nome</label>
              <input id="m-nome" name="nome" type="text" value={formData.nome} onChange={handleInputChange} required />

              <label htmlFor="m-idade">Idade</label>
              <input id="m-idade" name="idade" type="number" value={formData.idade} onChange={handleInputChange} />

              <label htmlFor="m-cpf">CPF</label>
              <input id="m-cpf" name="cpf" type="text" value={formData.cpf} onChange={handleInputChange} />

              <label htmlFor="m-telefone">Telefone</label>
              <input id="m-telefone" name="telefone" type="text" value={formData.telefone} onChange={handleInputChange} required />

              <label htmlFor="m-email">E-mail</label>
              <input id="m-email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />

              <label htmlFor="m-endereco">Endereço</label>
              <input id="m-endereco" name="endereco" type="text" value={formData.endereco} onChange={handleInputChange} />

              <label htmlFor="m-rede-social">Redes Sociais</label>
              <input id="m-rede-social" name="redesSociais" type="text" value={formData.redesSociais} onChange={handleInputChange} />

              <label htmlFor="m-observacao">Observação</label>
              <textarea id="m-observacao" name="observacao" value={formData.observacao} onChange={handleInputChange}></textarea>

              <label htmlFor="m-categoria">Categoria</label>
              <select id="m-categoria" name="categoria" value={formData.categoria} onChange={handleInputChange}>
                <option value="Amigos">Amigos</option>
                <option value="Família">Família</option>
                <option value="Clientes">Clientes</option>
                <option value="Favoritos">Favoritos</option>
              </select>

              <button type="submit">Salvar</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      <footer>
      <button className={styles.addContactBtn} onClick={() => openModal()}>Adicionar</button>
      </footer>
    </div>
  );
};

export default ContactsPage;  
