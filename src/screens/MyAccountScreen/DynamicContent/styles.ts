import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[5],
  },

  infoCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[5],
    ...theme.shadows.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing[4],
  },
  infoLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    flexShrink: 1,
    textAlign: "right",
    marginLeft: theme.spacing[4],
  },
  infoValueHighlight: {
    color: theme.colors.success,
  },

  listCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[2],
    ...theme.shadows.sm,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing[3],
  },
  listCardContent: {},
  listTitle: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text.secondary,
  },
  listChevronCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.surface.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  listChevron: {
    width: 20,
    fontSize: theme.typography.fontSizes.xl,
    lineHeight: 20,
    color: theme.colors.text.onSecondary,
    textAlign: "center",
  },
  listChevronPlaceholder: {
    width: 20,
    height: 20,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing[3],
  },
  listItemPressed: {
    opacity: 0.7,
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing[3],
  },
  listAvatarText: {
    color: theme.colors.primary.brand,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  listItemBody: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1] / 2,
  },
  listItemSub: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.text.tertiary,
  },
});
