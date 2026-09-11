// Regra de bloqueio de módulo, compartilhada entre a visão da cliente
// (src/routes/modules.js) e o cálculo de progresso pra admin (src/routes/users.js).
// Bônus (kind === 'bonus') nunca é bloqueado por produto — fica sempre aberto pra
// todo mundo, só pode ficar trancado por fase (phase_gated) se a Andréa configurar assim.
function isModuleLocked(mod, { entitledProductIds, unlockedModuleIds }) {
  if (mod.product_id && mod.kind !== 'bonus' && !entitledProductIds.has(mod.product_id)) {
    return { locked: true, lockReason: 'product' };
  }
  if (mod.phase_gated && !unlockedModuleIds.has(mod.id)) {
    return { locked: true, lockReason: 'phase' };
  }
  return { locked: false, lockReason: null };
}

module.exports = { isModuleLocked };
